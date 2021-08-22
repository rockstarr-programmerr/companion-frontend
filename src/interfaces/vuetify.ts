import Vue from 'vue'

export declare type VForm = Vue & {
  validate: () => boolean;
  resetValidation: () => void;
  reset: () => void;
}
