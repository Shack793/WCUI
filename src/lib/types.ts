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

export interface CheckStatusResponse {
  code: string;
  message: string;
  data: {
    refNo: string;
    msisdn: string;
    amount: string;
    customer: string;
    narration: string;
    transactionStatus: string;
    transactionId: string | null;
    responseCode: string;
  };
}
