use actix_web::{web, post, HttpResponse};
use sqlx::PgPool;
use chrono::Utc;

use crate::models::{longurls::UrlEntry, idGenerator::Id};
use crate::handlers::base62::encode;


#[post("/shorten")]
pub async fn shorten_url(
    long_url: web::Json<UrlEntry>,
    id_gen: web::Data<Id>,
    db: web::Data<PgPool>,
) -> HttpResponse {
    let id = id_gen.get_ref().generate_id();
    let short_url = encode(id);

    let result = sqlx::query!(
        "INSERT INTO urls (short_url, long_url, created_at) VALUES ($1, $2, $3)",
        short_url,
        long_url.url,
        Utc::now().naive_utc()
    )
    .execute(db.get_ref())
    .await;

    match result {
        Ok(_) => HttpResponse::Ok().json(serde_json::json!({ "short_url": short_url })),
        Err(e) => HttpResponse::InternalServerError().body(format!("DB error: {}", e)),
    }
}