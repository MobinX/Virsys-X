// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

let colabLink = ""

export default async function handler(req, res) {

  const {prmt} = req.body;
  const ans  = await fetch({url:colabLink,body:prmt})
  res.status(200).json({ ans: ans.replace("AI: ","").replace("Human: ","")});
}
