import axios from "axios";
import React, { useState, useEffect } from "react";
import {FaEdit, FaTrash} from 'react-icons/fa';

const Principal = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null)
  const [dadosEditados, setDadosEditados] = useState({
    nome: '',
    email: '',
    profissao:'',
  })

  const carregarUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    try{
      await axios.delete(`http://localhost:3000/usuarios/${id}`)
    carregarUsuarios();
    } catch (error){
   console.error(error)
    }
  }

  const handleEdit = (id) =>{
    setEditando(id);
    const usuariosEditando = usuarios.find((usuario) =>
    usuarios.id === id)
    setDadosEditados({
      nome: usuariosEditando.nome,
      email: usuariosEditando.email,
      profissao: usuariosEditando.profissao,
    });
  };

  const handleSaveEdit = async (id) => {
    try {
      if(
        dadosEditados.nome.trim()=== ''||
        dadosEditados.email.trim()=== ''||
        !isValidEmail(dadosEditados.email) ||
        dadosEditados.profissao.trim()=== ''
      ){
        alert ('Por favor, preencha os campos corretamente.');
        return;
      } 

      await axios.put(`http://localhost:3000/usuarios/${id}`, dadosEditados);
      setEditando(null)
      carregarUsuarios();



    } catch (error) {
      console.error(error)
    }
  }

  const isValidEmail = (email) => {
    return email.inCludes('@')
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <div style={{ textAlign: 'center'}}>
      <h1>Mostrar usuario</h1>
      <ul style={{listStyleType: 'none', padding: 0 }}>

        {usuarios.map((usuario) => (
          <li key={usuario.id} style={{
            border: '1px solid #cc', 
            borderRadius: '8px',
            margin: '10px',
            padding: '10px',
            display: 'flex',
            justifyContent:'space-between',
            alignItems: 'center'
          }}
          
          >{editando === usuario.id ? (<>
          <input
          type="text"
          value={dadosEditados.nome}
          onChange={(e) => setDadosEditados({... dadosEditados,nome: e.target.value})}/>
          <input
           type="email"
           value={dadosEditados.email}
           onChange={(e) => setDadosEditados({... dadosEditados,email: e.target.value})}/>
           <select
           id="profissao"
           name="profissao"
           value={dadosEditados.profissao}
           onChange={(e) => setDadosEditados({... dadosEditados, profissao: e.target.value
           })} required
           >
            <option value=""> Selecione a opção</option>
            <option value= "estudante"> Estudante</option>
            <option value= "engenheiro"> Engenheiro</option>
            <option value= "professor"> Professor</option>
            <option value= ""> Outro</option>
           </select>
           <button onClick={() => handleSaveEdit(usuario.id)}>Salvar</button>
          </>): (<> 
           <div>
            <strong>Nome: {usuario.nome} {''}</strong>
            <strong>Email: {usuario.email} {''}</strong>
            <strong>Profissao: {usuario.profissao} {''}</strong>
           </div>
           <div>
            <button onClick={() => handleDelete(usuario.id)}><FaTrash/></button>
            <button onClick={() => handleEdit(usuario.id)}><FaEdit/></button>
           </div>
          </>)}
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Principal;