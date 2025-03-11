import gameService from "../services/gameService.js";
import { ObjectId } from "mongodb";

// Função para listar todos os jogos
const getAllGames = async (req, res) => {
  try {
    const games = await gameService.getAll();
    // Requisição feita com sucesso - Cod. 200 (OK)
    res.status(200).json({ games: games });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para cadastrar jogos
const createGame = async (req, res) => {
  try {
    // const title = req.body.title é a mesma coisa que:
    // Como não temos o front end de cadastro, o cadastro será feito pelo Insomnia
    // Capturando valores
    // Desestruturação
    const { title, plataform, year, price } = req.body;
    // Cadastrando no banco
    await gameService.Create(title, plataform, year, price);
    res.sendStatus(201); // Código 201 (CREATED)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

// Função para deletar jogos
const deleteGame = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      gameService.Delete(id);
      res.sendStatus(204); // Código de 204 (NO CONTENT)
    } else {
      res.sendStatus(400); // Código de 400 (BAD REQUEST)
      // Requisição mal formada 
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};
export default { getAllGames, createGame, deleteGame };
