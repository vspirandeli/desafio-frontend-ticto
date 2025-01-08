/* eslint-disable @next/next/no-img-element */
"use client";

import { v4 as uuidV4 } from "uuid";
import React, { useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";

import styles from "./modal.module.scss";

import { Transaction, TransactionType } from "@/app/types/transaction";

type Props = {
  isOpen: boolean;
  onClose: () => void;

  handleAddTransaction: (transaction: Transaction) => void;
};

export function Modal({ isOpen, onClose, handleAddTransaction }: Props) {
  const [name, setName] = useState<string>("");
  const [nameHasErrors, setNameHasErrors] = useState<boolean>(false);

  const [price, setPrice] = useState<string>("");
  const [priceHasErrors, setPriceHasErrors] = useState<boolean>(false);

  const [category, setCategory] = useState<string>("");
  const [categoryHasErrors, setCategoryHasErrors] = useState<boolean>(false);

  const [transactionType, setTransactionType] =
    useState<TransactionType | null>(null);

  function handleChangeTransactionType(value: TransactionType) {
    if (value === transactionType) {
      return;
    }

    setTransactionType(value);
  }

  function handleCloseModal() {
    setTransactionType(null);

    setName("");
    setCategory("");
    setPrice("");
    setNameHasErrors(false);
    setCategoryHasErrors(false);
    setPriceHasErrors(false);

    onClose();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;
    if (!input) {
      return;
    }

    let value = input.replace(/\D/g, "");
    value = (Number(value) / 100).toFixed(2);
    value = value.replace(".", ",");
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    setPrice(`R$ ${value}`);
  }

  function handleCategoryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCategory(event.target.value);
  }

  function handleValidateName() {
    const nameIsEmpty = name.trim().length === 0;
    const nameIsLessThanTreeCharacters = name.trim().length < 3;
    const nameIsGreaterThanFiftyCharacters = name.trim().length > 50;
    const nameHasErrors =
      nameIsEmpty ||
      nameIsLessThanTreeCharacters ||
      nameIsGreaterThanFiftyCharacters;

    setNameHasErrors(nameHasErrors);

    return nameHasErrors;
  }

  function handleValidatePrice() {
    const priceValue = price.replace(/\D/g, "");

    const priceIsEmpty = priceValue.trim().length === 0;
    const priceShouldBeGreaterThanOne = Number(priceValue) > 1;
    const priceHasErrors = priceIsEmpty || !priceShouldBeGreaterThanOne;

    setPriceHasErrors(priceHasErrors);

    return priceHasErrors;
  }

  function handleValidateCategory() {
    const categoryIsEmpty = category.trim().length === 0;
    const categoryIsLessThanTreeCharacters = category.trim().length < 3;
    const categoryIsGreaterThanFiftyCharacters = category.trim().length > 50;
    const categoryHasErrors =
      categoryIsEmpty ||
      categoryIsLessThanTreeCharacters ||
      categoryIsGreaterThanFiftyCharacters;

    setCategoryHasErrors(categoryHasErrors);

    return categoryHasErrors;
  }

  function handleRegister(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const nameHasErrors = handleValidateName();
    const categoryHasErrors = handleValidateCategory();
    const priceHasErrors = handleValidatePrice();

    if (nameHasErrors) {
      if (!name) {
        alert("Nome é obrigatório");
        return;
      }

      if (name.trim().length < 3) {
        alert("Nome deve ter no mínimo 3 caracteres");
        return;
      }

      if (name.trim().length > 50) {
        alert("Nome deve ter no máximo 50 caracteres");
        return;
      }
    }

    if (priceHasErrors) {
      if (!price) {
        alert("Preço é obrigatório");
        return;
      }

      if (Number(price) < 1) {
        alert("Preço deve ser maior que 1");
        return;
      }
    }

    if (categoryHasErrors) {
      if (!category) {
        alert("Categoria é obrigatória");
        return;
      }

      if (category.trim().length < 3) {
        alert("Categoria deve ter no mínimo 3 caracteres");
        return;
      }

      if (category.trim().length > 50) {
        alert("Categoria deve ter no máximo 50 caracteres");
        return;
      }
    }

    if (transactionType === null) {
      alert("Tipo de transação é obrigatório. (Entrada ou Saída)");

      return;
    }

    const transaction: Transaction = {
      id: uuidV4(),
      name,
      price: Number(price.replace(/\D/g, "")) / 100,
      category,
      type: transactionType,
      date: new Date(),
    };

    handleAddTransaction(transaction);
    handleCloseModal();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onKeyDown={handleKeyDown}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={handleCloseModal}>
          <img src="/assets/close-icon.svg" alt="Fechar" />
        </button>

        <form className={styles.content}>
          <h4>Cadastrar Transação</h4>

          <input
            required
            type="text"
            placeholder="Nome"
            value={name}
            onChange={handleNameChange}
            className={nameHasErrors ? styles.inputError : ""}
            onBlur={handleValidateName}
          />

          <input
            required
            type="text"
            placeholder="Preço"
            value={price}
            onChange={handlePriceChange}
            className={priceHasErrors ? styles.inputError : ""}
            onBlur={handleValidatePrice}
          />

          <RadioGroup
            value={transactionType}
            onChange={handleChangeTransactionType}
            className={styles.radioContainer}
          >
            <Radio
              value="inbound"
              className={`${styles.radio} ${
                transactionType === "inbound" ? styles.radioInboundActive : ""
              }`}
            >
              <img
                src={
                  transactionType === "inbound"
                    ? "/assets/inbound-radio-active-icon.svg"
                    : "/assets/inbound-radio-icon.svg"
                }
                alt="Entrada"
              />
              Entrada
            </Radio>

            <Radio
              value="outbound"
              className={`${styles.radio} ${
                transactionType === "outbound" ? styles.radioOutboundActive : ""
              }`}
            >
              <img
                src={
                  transactionType === "outbound"
                    ? "/assets/outbound-radio-active-icon.svg"
                    : "/assets/outbound-radio-icon.svg"
                }
                alt="Entrada"
              />
              Saída
            </Radio>
          </RadioGroup>

          <input
            required
            type="text"
            placeholder="Categoria"
            value={category}
            onChange={handleCategoryChange}
            className={categoryHasErrors ? styles.inputError : ""}
            onBlur={handleValidateCategory}
          />

          <button type="submit" onClick={handleRegister}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
