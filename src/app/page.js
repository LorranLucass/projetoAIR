"use client";
import './banner.css';
import Pagina from "@/components/Pagina";
import { Button, Card, Col, Row, Carousel } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [Jogadores, setJogadores] = useState([]);
  const [locaisdejogos, setLocaisdejogos] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEquipamentos(JSON.parse(localStorage.getItem("equipamentos")) || []);
      setEquipes(JSON.parse(localStorage.getItem("equipes")) || []);
      setEventos(JSON.parse(localStorage.getItem("eventos")) || []);
      setJogadores(JSON.parse(localStorage.getItem("Jogadores")) || []);
      setLocaisdejogos(JSON.parse(localStorage.getItem("locaisdejogos")) || []);
    }
  }, []);

  const lista = [
    {
      nome: "Equipamentos",
      imagem:
        "https://blog.tremeterra.com.br/wp-content/uploads/2018/12/242958-conheca-as-5-melhores-armas-para-airsoft-700x510.jpg",
      quantidade: equipamentos.length,
      link: "http://localhost:3000/equipamentos",
    },
    {
      nome: "Equipes",
      imagem:
        "https://scontent.fbsb3-1.fna.fbcdn.net/v/t1.6435-9/179195485_1402264543479113_3195058873807003418_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=0b6b33&_nc_eui2=AeH1EpH9n_FJ61GnBjqgFR7PCyqoUlM4VEkLKqhSUzhUSVG75K_di3lZ93xkhTjXIVlv1LZ7SCSMiYGYGDER5QmB&_nc_ohc=kao3ws8GbKQQ7kNvgGeTdM0&_nc_zt=23&_nc_ht=scontent.fbsb3-1.fna&_nc_gid=A4Dz-3fp4wF7DDK2Olde35O&oh=00_AYDlxTaswqkaXyprhxyIRJxmXelhMqrsXll8pjaBuN2row&oe=6755005C",
      quantidade: equipes.length,
      link: "http://localhost:3000/equipes",
    },
    {
      nome: "Eventos",
      imagem:
        "https://airsoftzone.com.br/storage/AcN11LmV5A3FeCqaeIIfJLoCmGILel-metaV2hhdHNBcHAgSW1hZ2UgMjAyNC0wNy0wOCBhdCAxMS41Ni40Ny5qcGVn-.jpg",
      quantidade: eventos.length,
      link: "/eventos",
    },
    {
      nome: "Jogadores",
      imagem:
        "https://www.adrena.me/blog/wp-content/uploads/2020/01/Campo-de-Airsoft-e1582217047966-1200x675.jpg",
      quantidade: Jogadores.length,
      link: "http://localhost:3000/Jogadores",
    },
    {
      nome: "Locais de jogos",
      imagem:
        "https://catracalivre.com.br/cdn-cgi/image/f=auto,q=60,width=960,height=99999,fit=scale-down/wp-content/uploads/2020/09/diversao-garantida-nas-ferias-do-hotel-terras-altas.jpeg",
      quantidade: locaisdejogos.length,
      link: "/locaisdejogos",
    },
  ];
console.log(`Locais de jogos quantidade: ${locaisdejogos.length}`)
  return (
    <Pagina>
      <Carousel className="my-4 carousel-custom">
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://images.squarespace-cdn.com/content/v1/564b4b09e4b082acc13d17e6/1569991734571-2D630SJXVYH7M6RS3RWQ/MSR.jpg?format=1500w"
            alt="Imagem de Airsoft 1"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://gunfire.com/data/include/img/news/1671204498.webp"
            alt="Imagem de Airsoft 2"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://www.lojadacarabina.com.br/media/wysiwyg/Bad_day_3-_32-de-284_.png"
            alt="Imagem de Airsoft 3"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://images.tcdn.com.br/img/img_prod/1228426/1687314140_banner_02.png"
            alt="Imagem de Airsoft 3"
          />
        </Carousel.Item>
      </Carousel>

      <Row md={4}>
        {lista.map((item) => (
          <Col className="py-3" key={item.nome}>
            <Card
              style={{
                height: "100%",
                border: "none",
                borderRadius: "15px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                transition: "transform 0.3s",
              }}
              className="card-modern"
            >
              <Card.Img
                src={item.imagem}
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  {item.nome}
                </Card.Title>
                <p style={{ fontSize: "0.9rem" }}>Cadastrados: {item.quantidade}</p>
              </Card.Body>
              <Card.Footer className="text-end" style={{ background: "transparent" }}>
                <Button
                  href={item.link}
                  style={{
                    backgroundColor: "#f77f00",
                    border: "none",
                    fontWeight: "bold",
                  }}
                >
                  Ver Lista
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      
    </Pagina>
  );
}
