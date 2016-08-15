using RestSimples.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace RestSimples.Controllers
{
    [RoutePrefix("api/livros")]
    public class LivroController : ApiController
    {
        private static List<LivroModel> livros = new List<LivroModel>();

        public LivroController()
        {
            //Inicializar uma coleção
            if (livros.Count == 0)
            {
                livros.Add(new LivroModel { Id = 1, Nome = "Senhor dos Anéis", Autor = "J. R. R. Tolkien", Paginas = 1200 });
                livros.Add(new LivroModel { Id = 2, Nome = "A Revolta de Atlas", Autor = "Ayn Rand", Paginas = 1100 });
                livros.Add(new LivroModel { Id = 3, Nome = "O Guia do Mochileiro das Galáxias", Autor = "Douglas Adams", Paginas = 120 });
            }
        }

        [Route("")]
        public List<LivroModel> GetLivros()
        {
            return livros;
        }

        [Route("{id:int}")]
        public LivroModel GetLivro(int id)
        {
            var livro = livros.Where(l => l.Id == id).FirstOrDefault();
            return livro;
        }

        [Route("")]
        public string PostLivro(LivroModel livro)
        {
            livros.Add(livro);
            return "Livro incluído com sucesso!";
        }

        [Route("")]
        public string PutLivro(LivroModel livro)
        {
            var livroOriginal = livros.Where(l => l.Id == livro.Id).FirstOrDefault();
            livroOriginal.Nome = livro.Nome;
            livroOriginal.Autor = livro.Autor;
            livroOriginal.Paginas = livro.Paginas;

            return "Livro alterado com sucesso!";
        }

        [Route("{id:int}")]
        public string DeleteLivro(int id)
        {
            var livro = livros.Where(l => l.Id == id).FirstOrDefault();
            livros.Remove(livro);

            return "Livro excluído com sucesso!";
        }
    }
}
