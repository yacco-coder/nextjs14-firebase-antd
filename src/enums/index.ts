export enum ETypeProduct {
  product = "product",
  envase = "envase",
}

export enum ETypeCustomer {
  person = "person",
  company = "company",
}

export enum ETypeVoucher {
  order = "order",
  sale = "sale",
}

export enum ETypeMovement {
  fuel = "fuel",
  toll = "toll",
  lunch = "lunch",
  others = "others",
}

export enum ETypePaymentReason {
  expense = "expense",
  income = "income",
}

export enum EBank {
  bcp = "BCP",
  scotiabank = "SCOTIABANK",
}

export enum EMovement {
  increment = "increment",
  decrement = "decrement",
}

export enum EStatusVoucher {
  process = "process",
  sold = "sold",
  canceled = "canceled",
}

export enum EStatusDistribution {
  process = "process",
  closed = "closed",
}

export enum ERole {
  admin = "administrator",
  operator = "operator",
  distributor = "distributor",
}

export enum EWaterOutlet {
  normal = "normal",
  spout = "spout",
}

export enum EFilterDate {
  all = "all",
  year = "year",
  month = "month",
  week = "week",
  today = "today",
  custom = "custom",
}

export enum EWayToPay {
  cash = "cash",
  yape = "yape",
  card = "card",
  credit = "credit",
}
