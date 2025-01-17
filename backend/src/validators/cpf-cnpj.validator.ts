import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: false })
@Injectable()
export class IsCpfCnpjConstraint implements ValidatorConstraintInterface {
  validate(cpfCnpj: string): boolean {
    if (!cpfCnpj) return false;

    const cleaned = cpfCnpj.replace(/[^\d]+/g, '');

    // Valida CPF
    if (cleaned.length === 11) {
      return this.validateCPF(cleaned);
    }

    // Valida CNPJ
    if (cleaned.length === 14) {
      return this.validateCNPJ(cleaned);
    }

    return false; // Não é nem CPF nem CNPJ
  }

  defaultMessage(): string {
    return 'O CPF ou CNPJ informado é inválido';
  }

  private validateCPF(cpf: string): boolean {
    if (/^(\d)\1+$/.test(cpf)) return false; // Verifica se todos os dígitos são iguais
    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    return remainder === parseInt(cpf.substring(10, 11));
  }

  private validateCNPJ(cnpj: string): boolean {
    if (/^(\d)\1+$/.test(cnpj)) return false; // Verifica se todos os dígitos são iguais
    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    size += 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === parseInt(digits.charAt(1));
  }
}

export function IsCpfCnpj(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfCnpjConstraint,
    });
  };
}
