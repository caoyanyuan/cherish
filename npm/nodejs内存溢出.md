npm install 报错，错误信息如下：

```


C:\Users\ZNV>npm install vue -g
[..................] / rollbackFailedOptional: verb npm-session 2f498673870b2fe
<--- Last few GCs --->

[8412:00000000003F6150]    81166 ms: Scavenge 1394.6 (1424.7) -> 1393.8 (1425.7)
 MB, 6.6 / 0.0 ms  (average mu = 0.172, current mu = 0.069) allocation failure
[8412:00000000003F6150]    81261 ms: Scavenge 1395.0 (1425.7) -> 1394.4 (1427.2)
 MB, 7.2 / 0.0 ms  (average mu = 0.172, current mu = 0.069) allocation failure


<--- JS stacktrace --->

FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaS
cript heap out of memory
 1: 000000013F32C6AA v8::internal::GCIdleTimeHandler::GCIdleTimeHandler+4506
 2: 000000013F307416 node::MakeCallback+4534
 3: 000000013F307D90 node_module_register+2032
 4: 000000013F62189E v8::internal::FatalProcessOutOfMemory+846
 5: 000000013F6217CF v8::internal::FatalProcessOutOfMemory+639
 6: 000000013F807F94 v8::internal::Heap::MaxHeapGrowingFactor+9620
 7: 000000013F7FEF76 v8::internal::ScavengeJob::operator=+24550
 8: 000000013F7FD5CC v8::internal::ScavengeJob::operator=+17980
 9: 000000013F806317 v8::internal::Heap::MaxHeapGrowingFactor+2327
10: 000000013F806396 v8::internal::Heap::MaxHeapGrowingFactor+2454
11: 000000013F930468 v8::internal::Factory::AllocateRawArray+56
12: 000000013F9377A9 v8::internal::Factory::CopyPropertyArrayAndGrow+89
13: 000000013F6825A4 v8::internal::JSReceiver::class_name+5428
14: 000000013F6836E1 v8::internal::JSReceiver::class_name+9841
15: 000000013F9F56C1 v8::internal::LookupIterator::ApplyTransitionToDataProperty
+241
16: 000000013F68611D v8::internal::JSReceiver::class_name+20653
17: 000000013F9216E9 v8::internal::wasm::WasmCodeManager::LookupCode+15273
18: 000000013F633402 v8::Object::Set+290
19: 000000013F6334FD v8::Object::Set+77
20: 000000013F31DB8E node::UVException+1566
21: 000000013F2C6E91 uv_loop_fork+8737
22: 000000013F374997 uv_timer_set_repeat+1687
23: 000000013F36FE74 uv_dlerror+2452
24: 000000013F370C48 uv_run+232
25: 000000013F30E76E node::NewContext+1390
26: 000000013F30ED7B node::NewIsolate+603
27: 000000013F30F1D7 node::Start+823
28: 000000013F1BF3CC node::MultiIsolatePlatform::MultiIsolatePlatform+604
29: 000000013FE06E3C v8::internal::compiler::OperationTyper::ToBoolean+129516
30: 0000000076BA59CD BaseThreadInitThunk+13
31: 0000000076F4383D RtlUserThreadStart+29

C:\Users\ZNV>npm install vue -g
+ vue@2.6.10
added 1 package from 1 contributor in 33.88s

```
解决办法：
