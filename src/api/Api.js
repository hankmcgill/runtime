export async function getTest () {
  await fetch('https://api.github.com/users/xiaotian/repos').then(
    resp => resp.json() // this returns a promise
  ).then(repos => {
    for (const repo of repos) {
      console.log(repo.name);
    }
  }).catch(ex => {
    console.error(ex);
  })
}