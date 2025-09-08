use actix_web::{web, App, HttpServer};
use dotenvy::dotenv;
use std::env;

mod services;
mod database;
mod handlers;
mod models;
mod config;

use crate::config::cors_config::cors_config;
use crate::database::db::establish_connection;
use crate::services::shorten::shorten_url;
use crate::services::redirect::redirect_url;
use crate::services::recent::recent_urls;
use crate::models::idGenerator::Id;

#[actix_web::main]

async fn main() -> std::io::Result<()> {

    dotenv().ok();

    let db_client = establish_connection().await.expect("Failed to connect to the database");
    let machine_id = std::env::var("MACHINE_ID").unwrap().parse::<u8>().unwrap();
    let id_gen = Id::new(machine_id);


    // 👇 read port from env or fallback to 8080
    let port: u16 = env::var("PORT")
        .unwrap_or_else(|_| "8080".to_string())
        .parse()
        .expect("PORT must be a number");


    HttpServer::new(move || {
        App::new()
            .wrap(cors_config())
            .app_data(web::Data::new(db_client.clone()))
            .app_data(web::Data::new(id_gen.clone()))
            .service(shorten_url)
            .service(redirect_url)
            .service(recent_urls)
            // .configure(handlers::init_routes) // Uncomment and implement route initialization
    })
    .bind(("127.0.0.1", port))?
    .run()
    .await
}

