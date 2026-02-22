"""Seed the database with sample data matching the frontend mocks."""

from database import SessionLocal, engine, Base
from models import User, Order, OrderResponse, Review, PerformerProfile
from auth import hash_password
import datetime as _dt


def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Check if already seeded
    if db.query(User).first():
        print("Database already has data — skipping seed.")
        db.close()
        return

    # ── Users ────────────────────────────────────────────
    client1 = User(
        name="Анна К.",
        email="anna@example.com",
        password_hash=hash_password("password123"),
        role="client",
        city="Минск",
        phone="+375 29 111-11-11",
        rating=4.9,
        completed_orders=5,
    )
    client2 = User(
        name="Марина С.",
        email="marina@example.com",
        password_hash=hash_password("password123"),
        role="client",
        city="Брест",
        phone="+375 29 222-22-22",
        rating=4.6,
        completed_orders=3,
    )
    performer1 = User(
        name="Александр Петров",
        email="alex@example.com",
        password_hash=hash_password("password123"),
        role="performer",
        city="Минск",
        phone="+375 29 123-45-67",
        bio="Профессиональный клинер с 5-летним опытом. Специализируюсь на генеральной уборке, уборке после ремонта и химчистке мебели. Использую экологически чистые средства.",
        rating=4.9,
        completed_orders=124,
    )
    performer2 = User(
        name="Елена Сидорова",
        email="elena@example.com",
        password_hash=hash_password("password123"),
        role="performer",
        city="Минск",
        phone="+375 29 333-33-33",
        bio="Опытный специалист по уборке офисов и коммерческих помещений. Работаю быстро и качественно.",
        rating=4.7,
        completed_orders=89,
    )

    db.add_all([client1, client2, performer1, performer2])
    db.flush()

    # ── Performer Profiles ───────────────────────────────
    profile1 = PerformerProfile(
        user_id=performer1.id,
        level="gold",
        xp=2450,
        xp_to_next=3000,
        credits=150,
        bonus_credits=20,
        services=["Генеральная уборка", "Уборка после ремонта", "Химчистка мебели", "Мойка окон"],
        badges=[
            {"label": "Проверен", "color": "bg-emerald-100 text-emerald-800"},
            {"label": "Топ исполнитель", "color": "bg-yellow-100 text-yellow-800"},
            {"label": "Быстрый отклик", "color": "bg-blue-100 text-blue-800"},
        ],
        skills=[
            {"name": "Скорость", "level": 7, "max": 10, "effect": "+35% к видимости"},
            {"name": "Коммуникация", "level": 5, "max": 10, "effect": "Цветная карточка"},
            {"name": "Экономия", "level": 3, "max": 10, "effect": "15% шанс"},
            {"name": "Качество", "level": 6, "max": 10, "effect": "+0.2 к рейтингу"},
        ],
    )
    profile2 = PerformerProfile(
        user_id=performer2.id,
        level="silver",
        xp=1200,
        xp_to_next=2000,
        credits=50,
        bonus_credits=5,
        services=["Офисная уборка", "Поддерживающая уборка"],
        badges=[{"label": "Проверен", "color": "bg-emerald-100 text-emerald-800"}],
        skills=[
            {"name": "Скорость", "level": 4, "max": 10, "effect": "+20% к видимости"},
            {"name": "Коммуникация", "level": 3, "max": 10, "effect": "Цветная карточка"},
            {"name": "Экономия", "level": 2, "max": 10, "effect": "10% шанс"},
            {"name": "Качество", "level": 5, "max": 10, "effect": "+0.15 к рейтингу"},
        ],
    )

    db.add_all([profile1, profile2])

    # ── Orders (matching frontend mock data) ─────────────
    orders = [
        Order(
            title="Генеральная уборка 3-комнатной квартиры",
            description="После ремонта, удаление строительной пыли. Мытье окон, балкон, кухня, 2 санузла. Квартира 85 м² на пр. Независимости.",
            service_type="renovation",
            budget=450,
            city="Минск",
            date="2024-12-25",
            urgent=True,
            client_id=client1.id,
        ),
        Order(
            title="Поддерживающая уборка офиса 120 м²",
            description="Еженедельная уборка. Помыть полы, протереть пыль, вынести мусор. Район Московская.",
            service_type="maintenance",
            budget=180,
            city="Минск",
            date="2024-12-23",
            urgent=False,
            client_id=client1.id,
        ),
        Order(
            title="Химчистка дивана и 2 кресел",
            description="Нужна качественная химчистка мебели. Пятна от кофе и вина. Материал - велюр.",
            service_type="furniture",
            budget=320,
            city="Гомель",
            date="2024-12-24",
            urgent=True,
            client_id=client2.id,
        ),
        Order(
            title="Мытье окон в коттедже",
            description="Двухэтажный коттедж, окна с обеих сторон. Около 12 окон разного размера.",
            service_type="windows",
            budget=280,
            city="Могилев",
            date="2024-12-26",
            urgent=False,
            client_id=client2.id,
        ),
        Order(
            title="Уборка кухни от жира и нагара",
            description="Генеральная чистка кухни: вытяжка, плита, фартук, шкафчики снаружи и внутри.",
            service_type="general",
            budget=220,
            city="Брест",
            date="2024-12-27",
            urgent=False,
            client_id=client2.id,
        ),
    ]
    db.add_all(orders)
    db.flush()

    # ── Some order responses ─────────────────────────────
    responses = [
        OrderResponse(order_id=orders[0].id, performer_id=performer1.id, message="Готов выполнить! Опыт уборки после ремонта более 3 лет.", price=420),
        OrderResponse(order_id=orders[0].id, performer_id=performer2.id, message="Могу приехать завтра. Своё оборудование.", price=450),
        OrderResponse(order_id=orders[1].id, performer_id=performer2.id, message="Специализируюсь на офисах, готов на постоянную основу.", price=170),
        OrderResponse(order_id=orders[2].id, performer_id=performer1.id, message="Профессиональная химчистка гарантирована.", price=300),
    ]
    db.add_all(responses)

    # ── Reviews for performer1 ───────────────────────────
    # We'll create a completed order first for valid reviews
    completed_order = Order(
        title="Уборка квартиры",
        description="Генеральная уборка 2-комнатной квартиры",
        service_type="general",
        budget=200,
        city="Минск",
        date="2024-12-01",
        status="completed",
        client_id=client1.id,
        performer_id=performer1.id,
    )
    db.add(completed_order)
    db.flush()

    reviews = [
        Review(
            order_id=completed_order.id,
            author_id=client1.id,
            performer_id=performer1.id,
            rating=5,
            text="Отличная работа! Квартира сверкает. Очень аккуратный и пунктуальный.",
            created_at=_dt.datetime(2025, 1, 15),
        ),
        Review(
            order_id=completed_order.id,
            author_id=client2.id,
            performer_id=performer1.id,
            rating=5,
            text="Уборка после ремонта выполнена на высшем уровне. Рекомендую!",
            created_at=_dt.datetime(2025, 1, 3),
        ),
        Review(
            order_id=completed_order.id,
            author_id=client2.id,
            performer_id=performer1.id,
            rating=4,
            text="Хорошая работа, всё чисто. Приду снова.",
            created_at=_dt.datetime(2024, 12, 28),
        ),
    ]
    db.add_all(reviews)

    db.commit()
    db.close()
    print("✅ Database seeded successfully!")


if __name__ == "__main__":
    seed()
