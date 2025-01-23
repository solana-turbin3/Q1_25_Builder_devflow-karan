use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct EscrowState {
    pub seed: u64,
    pub maker: PubKey,
    pub mint_a: PubKey,
    pub mint_b: PubKey,
    pub receive_amount: u64,
    pub bump: u8,
}
