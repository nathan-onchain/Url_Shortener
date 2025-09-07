use actix_web::{web, App, HttpServer};
use dotenvy::dotenv;

mod services;
mod database;
mod handlers;
mod models;

use crate::database::db::establish_connection;
use crate::services::shorten::shorten_url;
use crate::services::redirect::redirect_url;
use crate::models::idGenerator::Id;

#[actix_web::main]

async fn main() -> std::io::Result<()> {

    dotenv().ok();

    let db_client = establish_connection().await.expect("Failed to connect to the database");
    let machine_id = std::env::var("MACHINE_ID").unwrap().parse::<u8>().unwrap();
    let id_gen = Id::new(machine_id);


    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(db_client.clone()))
            .app_data(web::Data::new(id_gen.clone()))
            .service(shorten_url)
            .service(redirect_url)
            // .configure(handlers::init_routes) // Uncomment and implement route initialization
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}

