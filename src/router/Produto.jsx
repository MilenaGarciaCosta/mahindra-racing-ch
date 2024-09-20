import fotoProduto1 from "../img/bone-mahindra-ft1.png";
import fotoProduto2 from "../img/bone-mahindra-ft2.png";
import "../css/produto.css"

const Produto = () => {
    return (
        <>
            <section className="main">
                <div className="flex-produto">
                    <div className="img-container">
                        <div className="img-back"><img className="foto1" src={fotoProduto1} alt="Boné Mahindra Racing" /></div>
                        <div className="img-back"><img className="foto2" src={fotoProduto2} alt="" /></div>
                    </div>
                    <div className="descricaoProduto">
                        <h2>Boné Mahindra Racing</h2>
                        
                        <p className="textoDescricao">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, eos eius earum numquam expedita deleniti, tenetur dolor ex sit libero deserunt! Quia sequi quod magni veritatis nam sapiente consequatur commodi!</p>

                        <div className="compraContainer">
                            <div className="valorProduto"><p><span className="valor">100</span> pontos</p></div>

                            <div className="compraContainer">
                                <button> Resgatar </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Produto;