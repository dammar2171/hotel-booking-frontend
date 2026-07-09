import React from "react";

interface FilterSectionProps {
  search: string;
  roomType: string;
  availability: string;
  priceRange: string;

  onSearchChange: (value: string) => void;
  onRoomTypeChange: (value: string) => void;
  onAvailabilityChange: (value: string) => void;
  onPriceRangeChange: (value: string) => void;

  onReset: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  search,
  roomType,
  availability,
  priceRange,
  onSearchChange,
  onRoomTypeChange,
  onAvailabilityChange,
  onPriceRangeChange,
  onReset,
}) => {
  return (
    <section style={{ padding: "60px 0" }}>
      <div className="container">
        <div
          className="custom-card"
          style={{
            padding: "32px",
          }}
        >
          <div className="row g-3 align-items-end">
            {/* Search */}
            <div className="col-lg-3 col-md-6">
              <label className="form-label fw-semibold">
                Search Room
              </label>

              <input
                type="text"
                className="custom-input"
                placeholder="Search by room name..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>

            {/* Room Type */}
            <div className="col-lg-2 col-md-6">
              <label className="form-label fw-semibold">
                Room Type
              </label>

              <select
                className="custom-input"
                value={roomType}
                onChange={(e) => onRoomTypeChange(e.target.value)}
              >
                <option value="">All</option>
                <option value="Suite">PentHouse</option>
                <option value="Suite">Suite</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Family</option>
              </select>
            </div>

            {/* Availability */}
            <div className="col-lg-2 col-md-6">
              <label className="form-label fw-semibold">
                Availability
              </label>

              <select
                className="custom-input"
                value={availability}
                onChange={(e) => onAvailabilityChange(e.target.value)}
              >
                <option value="">All</option>
                <option value="available">Available</option>
                <option value="booked">Booked</option>
              </select>
            </div>

            {/* Price */}
            <div className="col-lg-3 col-md-6">
              <label className="form-label fw-semibold">
                Price Range
              </label>

              <select
                className="custom-input"
                value={priceRange}
                onChange={(e) => onPriceRangeChange(e.target.value)}
              >
                <option value="">All Prices</option>
                <option value="0-3000">NPR 0 - 3,000</option>
                <option value="3001-6000">NPR 3,001 - 6,000</option>
                <option value="6001-10000">NPR 6,001 - 10,000</option>
                <option value="10001">Above NPR 10,000</option>
              </select>
            </div>

            {/* Reset */}
            <div className="col-lg-2 col-md-12">
              <button
                className="btn-ghost w-100"
                onClick={onReset}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;