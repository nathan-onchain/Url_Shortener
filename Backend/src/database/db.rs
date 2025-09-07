use sqlx::postgres::PgPoolOptions;
use sqlx::PgPool;
use std::env;

pub async fn establish_connection() -> Result<PgPool, sqlx::Error> {
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    
    Ok(
        PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Failed to create pool")
    )
}
