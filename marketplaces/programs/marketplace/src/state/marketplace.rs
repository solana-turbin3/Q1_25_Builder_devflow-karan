use anchor_lang::prelude::*;

#[account]
pub struct Marketplace {
    pub admin: Pubkey,
    pub fee: u16,

    pub bump: u8,
    pub treasury_bump: u8,
    pub rewards_mint_bump: u8,

    pub name: String, //set limit to 32KB
}

impl Space for Marketplace {
    const INIT_SPACE: usize = 8 + 32 + 2 + 1 + 1 + 1 + (4 + 32);
}