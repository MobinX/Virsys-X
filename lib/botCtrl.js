export const botCtrl = async (inp,callback,st="exp") => {
  let response = await fetch(`/api/${st}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({prmt:inp}),
  });
  if (response.ok) {
    let json = await response.json();
    callback(json.ans);
  } else {
    callback("");
    console.error(`Bot Error : HTTP : ${response.status}`);
  }
};
