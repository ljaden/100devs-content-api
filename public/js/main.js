const classNum = document.getElementById('classNum')
classNum.addEventListener('keyup', e => {
  const endpoint = document.getElementById('endpoint')
 
  endpoint.innerHTML = getEndpoint()
})

const select = document.querySelector('select')
select.addEventListener('change', e => {
  const endpoint = document.getElementById('endpoint')

  endpoint.innerHTML = getEndpoint()
})

// output results to DOM
const btnGet = document.getElementById('btn-get')
btnGet.addEventListener('click', async(e) => {
  // results
  let data = await getResults()
  // console.log(JSON.stringify(data))
  
  // output raw results
  const rawContainer = document.getElementById('raw')
  rawContainer.innerHTML = JSON.stringify(data)

  // output pretty results
  const prettyContainer = document.getElementById('pretty')
  prettyContainer.innerHTML = syntaxHighlight(JSON.stringify(data, undefined, 2))

})

// GET ENDPOINT
const getEndpoint = () => {
  let value

  if(classNum.value === '' && select.value === '') return ''
  
  if(classNum.value && select.value) {
    value = `class/${classNum.value}/${select.value}`
  } else if(classNum.value) {
    value = `class/${classNum.value}`
  } else {
    value = `${select.value}`
  }

  return `/api/${value}`
}

// GET RESULTS
const getResults = async() => {
  const endpoint = getEndpoint()  

  if(endpoint === '') return {Error: "Blank inputs"}

  try {
    const response = await axios.get(endpoint);
    return response.data
  } catch (error) {
    console.error(error);
  }
}

// TOGGLE TABS
const toggleTabs = (e,id) => {
  let tabcontent, tablinks
  // hide both tabcontents
  tabcontent = document.getElementsByClassName('tabcontent')
  for(let i=0; i<tabcontent.length; i++) {
    tabcontent[i].style.display = 'none'
  }
  // remove 'btn-success' class
  tablinks = document.getElementsByClassName("tablinks");
  for(let i=0; i<tablinks.length; i++) {
    tablinks[i].className = 'tablinks btn ';
  }
  // show content & add class to btn
  document.getElementById(id).style.display = 'block'
  e.currentTarget.className += 'btn-success'
}
  
// highlight json
const syntaxHighlight = (json) => {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
          if (/:$/.test(match)) {
              cls = 'key';
          } else {
              cls = 'string';
          }
      } else if (/true|false/.test(match)) {
          cls = 'boolean';
      } else if (/null/.test(match)) {
          cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
  });
}