<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="price-control">
          <v-text-field
            v-model="priceInput"
            label="Husets pris"
            prefix="kr"
            class="price-field"
            @blur="handlePriceInput"
            @keyup.enter="handlePriceInput"
          />
          <div class="price-adjusters">
            <div class="adjuster-group">
              <v-btn
                icon="mdi-chevron-up"
                density="comfortable"
                @click="adjustPrice(1000000)"
              />
              <div class="adjuster-label">
                1M
              </div>
              <v-btn
                icon="mdi-chevron-down"
                density="comfortable"
                @click="adjustPrice(-1000000)"
              />
            </div>
            <div class="adjuster-group">
              <v-btn
                icon="mdi-chevron-up"
                density="comfortable"
                @click="adjustPrice(100000)"
              />
              <div class="adjuster-label">
                100K
              </div>
              <v-btn
                icon="mdi-chevron-down"
                density="comfortable"
                @click="adjustPrice(-100000)"
              />
            </div>
            <div class="adjuster-group">
              <v-btn
                icon="mdi-chevron-up"
                density="comfortable"
                @click="adjustPrice(10000)"
              />
              <div class="adjuster-label">
                10K
              </div>
              <v-btn
                icon="mdi-chevron-down"
                density="comfortable"
                @click="adjustPrice(-10000)"
              />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div class="payment-info">
          <div class="payment-label">
            <div>Kontantinsats</div>
            <div class="percentage">
              {{ dataStore.downPaymentPercent }} %
            </div>
            <div class="amount">
              {{ formatPrice(dataStore.downPaymentMoney) }} kr
            </div>
          </div>
          <div class="payment-label">
            <div>Lån</div>
            <div class="percentage">
              {{ dataStore.loanPercent }} %
            </div>
            <div class="amount">
              {{ formatPrice(dataStore.loanMoney) }} kr
            </div>
          </div>
        </div>

        <div class="payment-bar">
          <div
            class="down-payment"
            :style="{ width: `${dataStore.downPaymentPercent}%` }"
          />
          <div
            class="loan"
            :style="{ width: `${dataStore.loanPercent}%` }"
          />
        </div>

        <v-slider
          v-model="downPaymentPercent"
          :min="0"
          :max="100"
          :step="1"
          thumb-label
          @update:model-value="updateDownPayment"
        >
          <template #thumb-label="{ modelValue }">
            {{ modelValue }}%
          </template>
        </v-slider>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <div class="price-control">
          <v-text-field
            v-model="interestRate"
            label="Ränta"
            suffix="%"
            class="field-input"
            height="96"
          />
          <div class="price-adjusters">
            <div class="adjuster-group">
              <v-btn
                icon="mdi-chevron-up"
                density="comfortable"
                @click="adjustInterest(1)"
              />
              <div class="adjuster-label">
                ±1%
              </div>
              <v-btn
                icon="mdi-chevron-down"
                density="comfortable"
                @click="adjustInterest(-1)"
              />
            </div>
            <div class="adjuster-group">
              <v-btn
                icon="mdi-chevron-up"
                density="comfortable"
                @click="adjustInterest(0.1)"
              />
              <div class="adjuster-label">
                ±0.1%
              </div>
              <v-btn
                icon="mdi-chevron-down"
                density="comfortable"
                @click="adjustInterest(-0.1)"
              />
            </div>
          </div>
        </div>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <div class="price-control">
          <v-text-field
            v-model="amortization"
            label="Amortering"
            prefix="kr/mån"
            class="field-input"
            height="96"
          />
          <div class="price-adjusters">
            <div class="adjuster-group">
              <v-btn
                icon="mdi-chevron-up"
                density="comfortable"
                @click="adjustAmortization(1000)"
              />
              <div class="adjuster-label">
                ±1000
              </div>
              <v-btn
                icon="mdi-chevron-down"
                density="comfortable"
                @click="adjustAmortization(-1000)"
              />
            </div>
            <div class="adjuster-group">
              <v-btn
                icon="mdi-chevron-up"
                density="comfortable"
                @click="adjustAmortization(100)"
              />
              <div class="adjuster-label">
                ±100
              </div>
              <v-btn
                icon="mdi-chevron-down"
                density="comfortable"
                @click="adjustAmortization(-100)"
              />
            </div>
            <div class="adjuster-group">
              <v-btn
                icon="mdi-chevron-up"
                density="comfortable"
                @click="adjustAmortization(10)"
              />
              <div class="adjuster-label">
                ±10
              </div>
              <v-btn
                icon="mdi-chevron-down"
                density="comfortable"
                @click="adjustAmortization(-10)"
              />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-checkbox
          v-model="taxDeduction"
          label="Ränteavdrag"
          @update:model-value="(value) => value !== null && dataStore.setTaxDeduction(value)"
        />
      </v-col>
    </v-row>

    <v-divider class="my-4" />

    <v-row>
      <v-col cols="12">
        <h3 class="text-h6 mb-4">
          Sammanfattning
        </h3>
        <div class="summary-item">
          <span>Bostadens pris:</span>
          <span>{{ formatPrice(dataStore.housePrice) }} kr</span>
        </div>
        <div class="summary-item">
          <span>Din kontantinsats:</span>
          <span>{{ formatPrice(dataStore.downPaymentMoney) }} kr ({{ dataStore.downPaymentPercent }}%)</span>
        </div>
        <div class="summary-item">
          <span>Ditt bolån:</span>
          <span>{{ formatPrice(dataStore.loanMoney) }} kr ({{ dataStore.loanPercent }}%)</span>
        </div>
        <div class="summary-item">
          <span>Belåningsgrad:</span>
          <span>{{ Math.round(dataStore.leverageRatio) }}%</span>
        </div>
        <div class="summary-item">
          <span>Din ränta per månad ({{ dataStore.interestRate }}%):</span>
          <span>{{ formatPrice(dataStore.monthlyInterest) }} kr</span>
        </div>
        <div class="summary-item">
          <span>Din amortering per månad:</span>
          <span>{{ formatPrice(dataStore.amortization) }} kr</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useDataStore } from '@/stores/data'

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('sv-SE').format(Math.round(value))
}

const dataStore = useDataStore()
const downPaymentPercent = ref(dataStore.downPaymentPercent)
const priceInput = ref(formatPrice(dataStore.housePrice))
const interestRate = ref(dataStore.interestRate.toString())
const amortization = ref(dataStore.amortization.toString())
const taxDeduction = ref(dataStore.taxDeduction)


const adjustPrice = (amount: number) => {
  const newPrice = Math.max(0, dataStore.housePrice + amount)
  dataStore.setHousePrice(newPrice)
  priceInput.value = formatPrice(newPrice)
}

const updateDownPayment = (value: number) => {
  dataStore.setDownPaymentPercent(value)
}

const handlePriceInput = () => {
  const value = Number(priceInput.value.replace(/\D/g, ''))
  dataStore.setHousePrice(value)
  priceInput.value = formatPrice(value)
}

const adjustInterest = (amount: number) => {
  dataStore.setInterestRate(dataStore.interestRate + amount)
  interestRate.value = dataStore.interestRate.toString()
}

const adjustAmortization = (amount: number) => {
  dataStore.setAmortization(dataStore.amortization + amount)
  amortization.value = dataStore.amortization.toString()
}
</script>

<style scoped>
.price-control {
  display: flex;
  gap: 16px;
  align-items: stretch;
  min-height: 96px;
}

.field-input {
  flex: 1;
}

.price-adjusters {
  display: flex;
  gap: 8px;
  height: 100%;
  padding: 8px 0;
}

.adjuster-group {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.payment-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.payment-label {
  text-align: left;
}

.percentage {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.2;
}

.amount {
  color: rgba(var(--v-theme-on-surface), 0.7);
  font-size: 0.875rem;
}

.payment-bar {
  display: flex;
  height: 24px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.down-payment, .loan {
  transition: width 0.3s ease;
}

.down-payment {
  background-color: rgb(var(--v-theme-primary));
}

.loan {
  background-color: rgb(var(--v-theme-secondary));
}

.price-field, .rate-field, .amortization-field {
  flex: 1;
}

.adjuster-label {
  text-align: center;
  font-size: 0.875rem;
  color: rgba(var(--v-theme-on-surface), 0.7);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.summary-item > span:first-child {
  color: rgba(var(--v-theme-on-surface), 0.7);
}

:deep(.v-field) {
  height: 100% !important;
}

:deep(.v-field__input) {
  min-height: 96px !important;
  align-items: center;
}
</style>
