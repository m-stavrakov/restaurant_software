class Convert:
    def __init__(self):
        pass
    
    # def set_total(self, total: float):
    #     self.total = total
    
    def eur_gbp(self, amount):
        return amount * 0.85536652
    
    def gbp_eur(self, amount):
        return amount * 1.1690895
    
    def gbp_usd(self, amount):
        return amount * 1.2596612
    
    def usd_gbp(self, amount):
        return amount * 0.79386424
    
    def usd_eur(self, amount):
        return amount * 0.92809833
    
    def eur_usd(self, amount):
        return amount * 1.077472
    