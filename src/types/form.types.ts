export type textFieldValidationType = (value?: string, silent?: boolean) => string[]
export type textFieldResetFormType = () =>  void
export type textFieldResetValidationType = () =>  void

export interface FormOptionsInterface {
  lazy: boolean
  validate: boolean
  disabled: boolean
  items: Array<{
    validate: textFieldValidationType, 
    resetValidation: textFieldResetValidationType, 
    resetForm: textFieldResetFormType
  }>
}

export type formRuleType = (v: string | undefined) => boolean | string

export interface FormRulesInterface {
  [key: string]: formRuleType
}
