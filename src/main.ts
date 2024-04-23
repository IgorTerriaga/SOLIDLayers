import express, { Request, Response } from "express";
import pgp from "pg-promise";

const app = express();
app.use(express.json());

app.post("/transactions", async (req: Request, response: Response) => {
  const connection = pgp()(
    "postgres://postgres:123456@localhost:5432/products-api"
  );
  await connection.query(
    "insert into igor.transaction(code,amount,number_installment, payment_method) values($1,$2,$3,$4)",
    [
      req.body.code,
      req.body.amount,
      req.body.number_installment,
      req.body.payment_method,
    ]
  );
  // const transactions = await connection.query("select * from igor.transaction");
  // console.log(transactions);
  await connection.$pool.end();

  console.log(req.body);
  response.end();
});

app.get("/transactions/:code", async (req: Request, response: Response) => {
  const connection = pgp()(
    "postgres://postgres:123456@localhost:5432/products-api"
  );
  const transaction = await connection.one(
    "select * from igor.transaction where code = $1",
    [req.params.code]
  );
  console.log(transaction);
  transaction.amount = parseFloat(transaction.amount);
  transaction.payment_method = transaction.payment_method;
  await connection.$pool.end();
  response.json(transaction);
});

app.listen(3000);
