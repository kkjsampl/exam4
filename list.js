function getPageno() {
  const params = new URLSearchParams(location.search);
  return params.get('pageno')===null? 1 : params.get('pageno');
}

async function fetch(pageno, pagesize=10) {
  try {
    return await $.ajax(`http://sample.bmaster.kro.kr/contacts?pageno=${pageno}&pagesize=${pagesize}`);
  } catch(err) {
    console.log(err);
    return null;
  }
}

function getPagination({pageno, pagesize, totalcount}) {
  return { prev:0, start:1, end:5, next:6};
}

function printContacts(contacts, $parent) {
  for(c of contacts) {
    const html = `
      <tr>
        <td>${c.no}</td>
        <td><a href='read.html?no=${c.no}'>${c.name}</a></td>
        <td>${c.tel}</td>
        <td>${c.address}</td>
      </tr>
    `;
    $parent.append(html);
  }
}

function printPagination({prev, start, end, next}, pageno, $parent) {
  if(prev>0) {
    const html =`
      <li class='page-item'>
        <a class='page-link' href='list.html?pageno=${prev}'>이전으로</a>
      </li>`;
    $parent.append(html);
  }
  for(let i=start; i<=end; i++) {
    const className = pageno===i? 'page-item active' : 'page-item';
    const html =`
      <li class='${className}'>
        <a class='page-link' href='list.html?pageno=${i}'>${i}</a>
      </li>`;
    $parent.append(html);  
  }
  if(next>0) {
    const html =`
      <li class='page-item'>
        <a class='page-link' href='list.html?pageno=${next}'>다음으로</a>
      </li>`;
    $parent.append(html);
  }
}