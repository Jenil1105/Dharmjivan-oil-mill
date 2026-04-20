function ProductCard({ item, formatCurrency, addToCart }) {
  return (
    <article className="group bg-white rounded-2xl p-4 border border-red-100/40 shadow-soft transition-all duration-500 flex flex-col relative overflow-hidden hover:-translate-y-1.5 hover:shadow-hover hover:border-red-300/50">
      <div className="w-full aspect-square rounded-xl product-image-gradient flex items-center justify-center mb-4 relative overflow-hidden">
        {item.category && (
          <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold uppercase tracking-wider text-primary shadow-sm">
            {item.category}
          </span>
        )}
        <img 
          src={item.image_url || '/dharmjivan_full.png'} 
          alt={item.name} 
          className="w-3/4 h-3/4 object-contain"
          onError={(e) => { e.target.src = '/dharmjivan_full.png' }}
        />
      </div>
      
      <div className="flex-1 flex flex-col">
        <h3 className="text-[1.1rem] font-bold text-slate-900 mb-1.5 leading-tight">{item.name}</h3>
        <p className="text-[0.8rem] text-slate-500 leading-relaxed mb-4 flex-1 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex justify-between items-end mt-auto">
          <div className="flex flex-col">
            {item.discounted_price ? (
              <>
                <span className="text-[0.75rem] line-through text-slate-400 mb-[-0.125rem]">
                  {formatCurrency(item.price)}
                </span>
                <span className="text-[1.25rem] font-extrabold text-slate-900">
                  {formatCurrency(item.discounted_price)}
                </span>
              </>
            ) : (
              <span className="text-[1.25rem] font-extrabold text-slate-900">
                {formatCurrency(item.price)}
              </span>
            )}
          </div>
          
          <button 
            className="bg-primary text-white border-none w-10 h-10 rounded-xl flex items-center justify-center text-[1rem] cursor-pointer transition-all duration-300 shadow-[0_4px_12px_rgba(220,38,38,0.2)] hover:bg-primary-hover hover:scale-105 hover:rounded-lg active:scale-95 outline-none" 
            onClick={() => addToCart(item)}
            aria-label="Add to cart"
            title="Add to cart"
          >
            <i className="fa-solid fa-plus text-sm"></i>
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
