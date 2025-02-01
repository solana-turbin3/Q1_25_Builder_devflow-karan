use anchor_lang::error_code;

#[error_code]
pub enum MarketplaceError {
    #[msg("Name must be at least 1 character long")]
    NameTooLong,
    #[msg("Arithmetic Error")]
    ArithmeticError,
    #[msg("Fee must be less than or equal to 100")]
    FeeTooHigh,
    #[msg("Invalid collection address")]
    CollectionInvalid,
    #[msg("Collection not verified")]
    CollectionNotVerified,
}