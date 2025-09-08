use actix_cors::Cors;
use actix_web::http;

pub fn cors_config() -> Cors {
    Cors::default()
        .allowed_origin("http://localhost:5173") // frontend dev server
        .allowed_origin("http://localhost:3000") // another common React port
        .allowed_methods(vec!["GET", "POST"])
        .allowed_headers(vec![http::header::CONTENT_TYPE])
        .supports_credentials()
}