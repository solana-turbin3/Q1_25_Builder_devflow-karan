use anchor_lang::prelude::*;

#[account]
pub struct Listing {
    pub maker: Pubkey,
    pub price: u64,
    pub mint: Pubkey,
    pub bump: u8,
}

impl Space for Listing {
    const INIT_SPACE: usize = 8 + 32 + 2 + 1 + 1 + 1  + (4 + 32);
}