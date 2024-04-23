import axios from "axios";
import pgp from 'pg-promise';


test("Deve criar uma transação", async () => {
  const code = `${Math.floor(Math.random() * 1000)}`;
  axios({
    url: "http://localhost:3000/transactions",
    method: "post",
    data: {
      code,
      amount: 1000,
      number_installment: 12,
      payment_method: "credit_card",
    },
  });
});
