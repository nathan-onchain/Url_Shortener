const CHARS: &[u8] = b"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

pub fn encode(mut num : u64) -> String {
    if num == 0 {
        return "a".to_string();
    }
    let mut encoded = Vec::new();
    while num > 0 {
        encoded.push(CHARS[{num % 62} as usize]);
        num /= 62;
    }

    encoded.reverse();
    String::from_utf8(encoded).unwrap()
}