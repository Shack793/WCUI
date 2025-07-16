// Types for payment and donation flows

export interface DebitWalletPayload {
  customer: string;
  msisdn: string;
  amount: string;
  network: string;
  narration: string;
}

export interface DebitWalletResponse {
  transactionId: string;
  status: string;
  message?: string;
}

export interface CheckStatusPayload {
  transactionId: string;
}

export interface CheckStatusResponse {
  status: string;
  message?: string;
}
