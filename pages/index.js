export default function Home() {
  return (
   <div
  className="flex items-center justify-center min-h-screen bg-no-repeat bg-contain bg-center"
  style={{ backgroundImage: "url('/images/backgrounestacionamiento.png')",backgroundSize: 'cover' }}
>


  <div className="text-center bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-lg">
    <h1 className="text-3xl font-bold text-gray-800">Estacionamiento</h1>
    <p className="mt-4 text-gray-700">Este es tu efecto glassmorphism 😎</p>
  </div>


</div>  

  );
}
