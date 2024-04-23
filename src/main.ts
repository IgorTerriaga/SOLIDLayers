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
  const transactions = await connection.query("select * from igor.transaction");
  console.log(transactions);
  await connection.$pool.end();

  console.log(req.body);
  response.end();
});

app.listen(3000);
