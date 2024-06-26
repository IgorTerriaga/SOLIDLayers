import axios from "axios";

test("Deve criar uma transação", async () => {
  const code = `${Math.floor(Math.random() * 1000)}`;
	await axios({
		url: "http://localhost:3000/transactions",
		method: "post",
		data: {
			code,
			amount: 1000,
			number_installment: 12,
			payment_method: "credit_card"
		}
	});
	const response = await axios({
		url: `http://localhost:3000/transactions/${code}`,
		method: "get"
	});
	const transaction = response.data;
	expect(transaction.code).toBe(code);
	expect(transaction.amount).toBe(1000);
	expect(transaction.payment_method).toBe("credit_card");
});
