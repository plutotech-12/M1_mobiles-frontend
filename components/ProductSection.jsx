export default function ProductSection({ title, children }) {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {title}
        </h2>

        <div className="space-y-8">
          {children}
        </div>
      </div>
    </section>
  );
}
