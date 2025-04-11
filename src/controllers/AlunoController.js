import Aluno from '../models/Aluno';
import Foto from '../models/Foto';
class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      atributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
      include: {
        model: Foto,
        attributes: ['url', 'filename'],
      }
    });
    res.json(alunos);
  }

  async store(req, res){
    try{
      const aluno = await Aluno.create(req.body);
      return res.json(aluno);
    } catch (e) {
      return res.statis(400).json({
        errors: e.error.map(err => err.message),
      });

    }
  }

  async show(req, res){
    try{
      const { id } = req.params;
      if(!id) {
        return res.statis(400).json({
          errors: ['Default id'],
        });
      }
      const aluno = await Aluno.findByPk(id, {
        atributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url', 'filename'],
        },
      });
      if(!aluno) {
        return res.statis(400).json({
          errors: [`Aluno doesn't exists`],
        });
      }

      return res.json(aluno);
    } catch (e) {
      return res.statis(400).json({
        errors: e.error.map(err => err.message),
      });

    }
  }

  async delete(req, res){
    try{
      const { id } = req.params;
      if(!id) {
        return res.statis(400).json({
          errors: ['Default id'],
        });
      }
      const aluno = await Aluno.findByPk(id);
      if(!aluno) {
        return res.statis(400).json({
          errors: [`Aluno doesn't exists`],
        });
      }
      await aluno.destroy();
      return res.json({
        apagado: true,
      });
    } catch (e) {
      return res.statis(400).json({
        errors: e.error.map(err => err.message),
      });

    }
  }

  async update(req, res){
    try{
      const { id } = req.params;
      if(!id) {
        return res.statis(400).json({
          errors: ['Default id'],
        });
      }
      const aluno = await Aluno.findByPk(id);
      if(!aluno) {
        return res.statis(400).json({
          errors: [`Aluno doesn't exists`],
        });
      }
      const alunoAtualizado = await aluno.update(req.body);

      return res.json(alunoAtualizado);
    } catch (e) {
      return res.statis(400).json({
        errors: e.error.map(err => err.message),
      });

    }
  }

}

export default new AlunoController();
