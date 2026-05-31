use axum::{Json, Router, routing::get};
use serde::Serialize;
use std::time::{SystemTime, UNIX_EPOCH};
use tokio::net::TcpListener;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let listener = TcpListener::bind("0.0.0.0:9527").await?;
    let app = Router::new()
        .route("/", get(index_handler))
        .route("/api/hello", get(api_handler));
    axum::serve(listener, app).await?;
    Ok(())
}

async fn index_handler() -> &'static str {
    "Hello, 世界"
}

#[derive(Serialize)]
pub struct ApiResp {
    pub msg: String,
    pub now: u128,
}

async fn api_handler() -> Json<ApiResp> {
    let now = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_millis();
    Json(ApiResp {
        msg: "Hello, 世界".into(),
        now,
    })
}
