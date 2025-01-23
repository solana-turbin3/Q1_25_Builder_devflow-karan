use anchor_lang::prelude::*;
pub mod state;
pub mod instructions;
declare_id!("2a9s7od2nTRdAd6Edm1F5jptJzKgsUEZD9B9gMT7L98m");
use crate::instructions::*;

#[program]
pub mod escrow {
    use super::*;

    pub fn make(ctx: Context<Make>, seed: u64, receive_amount: u64, deposit: u64) -> Result<()> {
        ctx.accounts.init_escrow_state(seed, receive_amount, &ctx.bumps)?;
        ctx.accounts.deposit_escrow(deposit)?;
        Ok(())
    }

    pub fn take(
        ctx: Context<Take>,
        seed: u64,
        receive_amount: u64,
        deposit_amount: u64,
    ) -> Result<()> {
        ctx.accounts.init_escrow_state(seed, receive_amount, &ctx.bumps)?;
        ctx.accounts.deposit(deposit_amount)?;

        Ok(())
    }
}
