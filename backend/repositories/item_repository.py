from models import LostItem, FoundItem
from database import db

class ItemRepository:
    @staticmethod
    def create_lost_item(name, description, image, location, user_id):
        item = LostItem(
            name=name,
            description=description,
            image=image,
            location=location,
            user_id=user_id
        )
        db.session.add(item)
        db.session.commit()
        return item
    
    @staticmethod
    def create_found_item(name, description, image, location, user_id):
        item = FoundItem(
            name=name,
            description=description,
            image=image,
            location=location,
            user_id=user_id
        )
        db.session.add(item)
        db.session.commit()
        return item
    
    @staticmethod
    def get_all_lost_items():
        return LostItem.query.order_by(LostItem.created_at.desc()).all()
    
    @staticmethod
    def get_all_found_items():
        return FoundItem.query.order_by(FoundItem.created_at.desc()).all()
    
    @staticmethod
    def get_lost_item_by_id(item_id):
        return LostItem.query.get(item_id)
    
    @staticmethod
    def get_found_item_by_id(item_id):
        return FoundItem.query.get(item_id)
    
    @staticmethod
    def get_user_lost_items(user_id):
        return LostItem.query.filter_by(user_id=user_id).order_by(LostItem.created_at.desc()).all()
    
    @staticmethod
    def get_user_found_items(user_id):
        return FoundItem.query.filter_by(user_id=user_id).order_by(FoundItem.created_at.desc()).all()
    
    @staticmethod
    def update_lost_item_status(item_id, status):
        item = LostItem.query.get(item_id)
        if item:
            item.status = status
            db.session.commit()
            return item
        return None
    
    @staticmethod
    def update_found_item_status(item_id, status):
        item = FoundItem.query.get(item_id)
        if item:
            item.status = status
            db.session.commit()
            return item
        return None
    
    @staticmethod
    def delete_lost_item(item_id):
        item = LostItem.query.get(item_id)
        if item:
            db.session.delete(item)
            db.session.commit()
            return True
        return False
    
    @staticmethod
    def delete_found_item(item_id):
        item = FoundItem.query.get(item_id)
        if item:
            db.session.delete(item)
            db.session.commit()
            return True
        return False
