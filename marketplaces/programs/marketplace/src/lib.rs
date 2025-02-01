use anchor_lang::prelude::*;

pub use contexts::*;
pub use state::*;

pub mod contexts;
pub mod state;
pub mod error;

declare_id!("v1Mg4QN6rfkCiAhZPdUBnr9JosQvX39JbCbhtsRZhFv");

#[program]
pub mod marketplace {
    use super::*;

    pub fn init_marketplace(ctx: Context<Initialize>, name: String, fees: u16) -> Result<()> {
        ctx.accounts.init(name, fees, &ctx.bumps)?;
        Ok(())
    }

    pub fn list(ctx: Context<List>, price: u64) -> Result<()> {
        ctx.accounts.create_listing(price, &ctx.bumps)?;
        ctx.accounts.deposit_nft()?;
        Ok(())
    }

    pub fn delist(ctx: Context<Delist>) -> Result<()> {
        ctx.accounts.withdraw_nft()?;
        ctx.accounts.close_listing()?;
        Ok(())
    }

    pub fn purchase(ctx: Context<Purchase>) -> Result<()> {
        ctx.accounts.send_sol()?;
        ctx.accounts.transfer_nft()?;
        ctx.accounts.close_listing()?;
        ctx.accounts.reward_buyer()?;
        Ok(())
    }
}
