use actix_web::{get, web, HttpResponse};
use sqlx::PgPool;
use serde::Serialize;


#[derive(Serialize)]
struct Url {
    long_url: String,
    short_url: String,
}


#[get("/recent-urls")]
async fn recent_urls(db: web::Data<PgPool>) -> actix_web::Result<HttpResponse> {
    let urls = sqlx::query_as!(
        Url,
        r#"
        SELECT long_url, short_url
        FROM urls
        ORDER BY created_at DESC
        LIMIT 10
        "#
    )
    .fetch_all(db.get_ref())
    .await
    .map_err(|_| actix_web::error::ErrorInternalServerError("DB error"))?;

    Ok(HttpResponse::Ok().json(urls))
}