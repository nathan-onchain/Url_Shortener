use actix_web::{web,get, HttpResponse};
use sqlx::PgPool;



#[get("/r/{short_url}")]
pub async fn redirect_url(
    short_url: web::Path<String>,
    db: web::Data<PgPool>,
) -> HttpResponse {
    let result = sqlx::query!(
        "SELECT long_url FROM urls WHERE short_url = $1",
        short_url.as_str()
    )
    .fetch_one(db.get_ref())
    .await;

    match result {
        Ok(record) => HttpResponse::Found()
            .append_header(("Location", record.long_url))
            .finish(),
        Err(_) => HttpResponse::NotFound().body("URL not found"),
    }
}
