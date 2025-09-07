use serde::Deserialize;
use std::sync::{Arc, Mutex};


#[derive(Debug,Deserialize, Clone)]
pub struct Id {
    pub machine_id: u8,
    pub sequence: Arc<Mutex<u16>>,
}

