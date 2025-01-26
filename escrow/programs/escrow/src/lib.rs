use anchor_lang::prelude::*;
pub mod instructions;
pub mod state;
pub use instructions::*;
declare_id!("2a9s7od2nTRdAd6Edm1F5jptJzKgsUEZD9B9gMT7L98m");

#[program]
pub mod escrow {
    use super::*;

    pub fn make(ctx: Context<Make>,seed:u64,receive_amount:u64,deposit_amount:u64) -> Result<()> {
        ctx.accounts.init_escrow_state(seed,receive_amount,&ctx.bumps)?;
        ctx.accounts.deposit_escrow(deposit_amount)?;
        Ok(())
    }

    pub fn take(ctx:Context<Take>)-> Result<()> {
        ctx.accounts.exchange()?;
        ctx.accounts.close_vault()?;
        Ok(())
    }
    
    pub fn refund(ctx:Context<Refund>)-> Result<()> {
        ctx.accounts.refund_and_close()?;
        Ok(())
    }
}