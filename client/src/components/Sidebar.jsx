export function Sidebar({conversations,select,create}){
  return (
    <div className="w-64 bg-black text-white p-3">
      <button onClick={create}>+ New Chat</button>
      {conversations.map(c=>(
        <div key={c._id} onClick={()=>select(c)}>{c.title}</div>
      ))}
    </div>
  );
}
