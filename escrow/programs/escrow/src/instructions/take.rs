use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{Mint, TokenAccount, TokenInterface},
};

use crate::state::EscrowState;

#[derive(Accounts)]
#[instruction(seeds:u64)]

pub struct Make<'info> {
    #[account(mut)]
    pub taker: Signer<'info>,
    #[account(mut)]
    pub maker: SystemAccount<'info>, //System Account

    pub mint_a: InterfaceAccount<'info, Mint>,
    pub mint_b: InterfaceAccount<'info, Mint>,

    #[account(
        init_if_needed,
        payer=taker,
        associated_token::mint=mint_a,
        associated_token::authority=taker,
    )]
    pub taker_mint_a_ata: InterfaceAccount<'info, TokenAccount>,

    #[account(
        mut,
        associated_token::mint=mint_a,
        associated_token::authority=taker,
    )]
    pub taker_mint_b_ata: InterfaceAccount<'info, TokenAccount>,

    #[account(
        mut,
        associated_token::mint=mint_b,
        associated_token::authority=maker,
    )]
    pub maker_mint_b_ata: InterfaceAccount<'info, TokenAccount>,

    #[account(
        mut,
        seeds=[b"escrow",taker.key.as_ref(), escrow.seed.to_le_bytes().as_ref()],
        bump=escrow.bump
    )]
    pub escrow: Account<'info, EscrowState>,

    #[account(
        mut,
        associated_token::mint=mint_a,
        associated_token::authority=escrow,
    )]
    pub vault: InterfaceAccount<'info, TokenAccount>,

    pub system_program: Program<'info, System>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Interface<'info, TokenInterface>,
}
