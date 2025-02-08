import { defineStore } from 'pinia'

interface DataState {
  housePrice: number
  downPaymentPercent: number
  loanPercent: number
  interestRate: number
  amortization: number
  taxDeduction: boolean
}

export const useDataStore = defineStore('data', {
  state: (): DataState => ({
    housePrice: 0,
    downPaymentPercent: 15, // Default 15% down payment
    loanPercent: 85, // Default 85% loan
    interestRate: 2.5, // Default 2.5%
    amortization: 2000, // Default 2000 kr/month
    taxDeduction: true, // Default enabled
  }),

  getters: {
    downPaymentMoney: (state): number => {
      return (state.housePrice * state.downPaymentPercent) / 100
    },
    loanMoney: (state): number => {
      return (state.housePrice * state.loanPercent) / 100
    },
    monthlyInterest(state): number {
      const yearlyInterest = (this.loanMoney * state.interestRate) / 100
      const monthlyInterest = yearlyInterest / 12
      return state.taxDeduction ? monthlyInterest * 0.7 : monthlyInterest
    },
    leverageRatio(state): number {
      return (this.loanMoney / state.housePrice) * 100
    },
  },

  actions: {
    setHousePrice(price: number) {
      this.housePrice = Math.max(0, price)
    },

    setDownPaymentPercent(percent: number) {
      // Ensure percent is between 0 and 100
      percent = Math.min(100, Math.max(0, percent))
      this.downPaymentPercent = percent
      this.loanPercent = 100 - percent
    },

    setLoanPercent(percent: number) {
      // Ensure percent is between 0 and 100
      percent = Math.min(100, Math.max(0, percent))
      this.loanPercent = percent
      this.downPaymentPercent = 100 - percent
    },

    setInterestRate(rate: number) {
      this.interestRate = Math.max(0, Math.round(rate * 10) / 10)
    },
    setAmortization(amount: number) {
      this.amortization = Math.max(0, Math.round(amount))
    },
    setTaxDeduction(enabled: boolean) {
      this.taxDeduction = enabled
    },
  },
})
