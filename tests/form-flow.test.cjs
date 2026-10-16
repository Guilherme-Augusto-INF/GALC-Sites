const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../js/main.js'), 'utf8');

function setup({mode='success',search='',phone='00000000000'}={}) {
  const handlers = {}, button={disabled:false,textContent:''}, key={value:''};
  const feedback={textContent:'',classList:{add(){},remove(){}}};
  const tel={value:phone,error:'',setCustomValidity(s){this.error=s},addEventListener(t,fn){handlers.phone=fn}};
  const message={value:''},select={value:'',options:['Site Básico','Site Profissional','Loja Virtual','Outro / Não sei ainda'].map(value=>({value}))};
  const actions=['Site Básico','Site Profissional'].map(plan=>({dataset:{plan},addEventListener(t,fn){this.click=fn}}));
  let submits=0,resets=0,release;
  const form={action:'https://api.web3forms.com/submit',addEventListener(t,fn){if(t==='submit')handlers.submit=fn},reportValidity(){return !tel.error},querySelector(q){return q.includes('whatsapp')?tel:button},reset(){resets++;key.value='';message.value='';tel.value='';select.value=''}};
  const nodes={'#contactForm':form,'#formFeedback':feedback,'#formAccessKey':key,'#projectType':select,'textarea[name="message"]':message};
  const cfg={brand:'GALC-Sites',web3formsAccessKey:'test-public-key'};
  const response={ok:mode!=='api-error',json:async()=>{if(mode==='invalid-json')throw new SyntaxError();return {success:mode!=='api-error'}}};
  const timers=[];
  const context={window:{SITE_CONFIG:cfg,location:{search,reload(){}}},document:{querySelector:q=>nodes[q]||null,querySelectorAll:q=>q==='.plan-action'?actions:[],addEventListener(){}},localStorage:{getItem:()=> 'rejected'},URLSearchParams,Object,AbortController,FormData:class{},setTimeout(fn){timers.push(fn);return timers.length},clearTimeout(){},fetch:async()=>{submits++;if(mode==='network')throw new TypeError('offline');if(mode==='timeout'){timers[0]();const e=new Error();e.name='AbortError';throw e}if(mode==='deferred')return new Promise(r=>{release=r});return response}};
  vm.runInNewContext(source,context);
  return {submit:()=>handlers.submit({preventDefault(){}}),button,key,feedback,tel,message,select,actions,counts:()=>({submits,resets}),release:()=>release(response)};
}
test('two submissions preserve the public key, clear data and unlock the button',async()=>{const s=setup();for(let i=0;i<2;i++){s.tel.value='00000000000';await s.submit();assert.equal(s.key.value,'test-public-key');assert.equal(s.button.disabled,false);assert.match(s.feedback.textContent,/sucesso/)}assert.deepEqual(s.counts(),{submits:2,resets:2})});
for(const mode of ['network','timeout','api-error','invalid-json'])test(`${mode} keeps data and permits retry`,async()=>{const s=setup({mode});s.message.value='Original request';await s.submit();assert.equal(s.message.value,'Original request');assert.equal(s.counts().resets,0);assert.equal(s.key.value,'test-public-key');assert.equal(s.button.disabled,false);assert.match(s.feedback.textContent,/Não foi possível enviar/) });
test('a simultaneous submission produces a single request',async()=>{const s=setup({mode:'deferred'});const first=s.submit();await s.submit();assert.equal(s.counts().submits,1);s.release();await first;assert.equal(s.button.disabled,false)});
test('invalid phone text never reaches the API',async()=>{const s=setup({phone:'abc'});await s.submit();assert.match(s.tel.error,/telefone válido/);assert.equal(s.counts().submits,0)});
test('plan changes update generated text while preserving custom text',()=>{const s=setup();s.actions[0].click();assert.equal(s.select.value,'Site Básico');s.actions[1].click();assert.equal(s.message.value,'Tenho interesse em: Site Profissional.');s.message.value='My own request';s.actions[0].click();assert.equal(s.message.value,'My own request')});
test('only known model queries prefill the form',()=>{const known=setup({search:'?modelo=consultorio'});assert.equal(known.message.value,'Tenho interesse em: Modelo Consultório.');const unknown=setup({search:'?modelo=__proto__'});assert.equal(unknown.message.value,'')});
