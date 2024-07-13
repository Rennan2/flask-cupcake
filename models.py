"""Models for Cupcake app."""

from flasksqlalchey import SQLAlchemy

db = SQLAlchemy()


DEFAULT_IMAGE = "https://www.dessertfortwo.com/wp-content/uploads/2022/02/Small-Batch-Vanilla-Cupcakes-5.jpg"


class Cupcake(db.Model):
    """cupcake"""

    __tablename__ = "cupcakes"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor = db.Column(db.Text, nullable=False)
    size = db.Column(db.text, nullable=False)
    rating = db.Column(db.float, nullable=False)
    image = db.Column(db.text, nullable=False, default=DEFAULT_IMAGE)

    def to_dict(self):
        
        return{
            "id": self.id,
            "flavor": self.flavor,
            "rating": self.rating,
            "size": self.size,
            "image": self.image,
        }
    

def connect_db(app):
    """connect to database"""

    db.app = app
    db.init_app(app)