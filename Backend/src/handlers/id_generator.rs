use std::sync::Mutex;
use chrono::Utc;

use crate::models::idGenerator::Id;

impl Id {
    pub fn new(machine_id: u8) -> Self {
        Self {
            machine_id,
            sequence: Mutex::new(0).into(),
        }
    }

    pub fn generate_id(&self) -> u64 {
        let timestamp = Utc::now().timestamp_millis() as u64;
        let mut seq = self.sequence.lock().unwrap();
        *seq = (*seq + 1) % 4096; // 12 bits for sequence
        (timestamp << 22) | ((self.machine_id as u64) << 12) | (*seq as u64)
    }
}

