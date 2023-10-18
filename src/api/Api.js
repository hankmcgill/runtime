export async function getTest () {
  await fetch('https://gad6zvq0pc.execute-api.us-east-1.amazonaws.com/DynamoDB_API/DynamoDBManager',
  {
    method: 'POST',
    body: JSON.stringify(
      {
        "operation": "update",
        "payload": {
            "Key": {
                "id": "1234ABCD"
            },
            "AttributeUpdates": {
                "number": {
                    "Value": 99
                }
            }
        }
      }
      ),
    // mode: 'no-cors',
    headers: {
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Methods':'*',
    //   'Access-Control-Allow-Origin' : '*',
    //   'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    //   'Access-Control-Allow-Credentials' : true,
    },
  }
  ).then(
    resp => resp.json() // this returns a promise
  ).then(repos => {
    for (const repo of repos) {
      console.log(repo.name);
    }
  }).catch(ex => {
    console.error(ex);
  })
}